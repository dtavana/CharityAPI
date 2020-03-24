module.exports.newDonation = async(req, res) => {
    const { db } = req.app.locals;
    const { email, amount, charity } = req.body;

    if(!email || !amount || !charity) {
        return res.status(401).send({
            success: false,
            data: "Incorrect Body Provided",
        });
    }
    let userId = await db.oneOrNone('SELECT userid FROM users WHERE email = $1;', email);
    if(userId === null) {
        userId = await db.one('INSERT INTO users (email) VALUES ($1) RETURNING userid;', email);
    }
    console.log(amount);
    console.log(charity);
    await db.none('INSERT INTO donations (userid, amount, charity) VALUES ($1, $2, $3);', [userId.userid, amount, charity]);
    // Add Tickets Here
    res.status(200).send({
        success: true,
        data: `Successfully added new donation for ${email} to ${charity}, for \$${amount}`,
    })
};

module.exports.getDonations = async(req, res) => {
    const { db } = req.app.locals;
    const { email } = req.body;

    if(!email) {
        return res.status(401).send({
            success: false,
            data: "Incorrect Body Provided",
        });
    }

    const userId = await db.oneOrNone('SELECT userid FROM users WHERE email = $1;', email);
    if(userId === null) {
        return res.status(401).send({
            success: false,
            data: `No user found for email ${email}`,
        });
    }
    const donations = await db.many('SELECT amount, charity, date FROM donations WHERE userid = $1;', userId.userid);
    res.status(200).send({
        success: true,
        data: donations,
    });
};
