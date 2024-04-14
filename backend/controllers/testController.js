//insert model

//get all
const getAll = async (req, res) => {
    const msg = [{ msg: "GET ALL, STATUS OK" }, { msg: "GET ALL, STATUS OK 2" }];

    res.status(200).json(msg);
};

//get single
const getSingle = async (req, res) => {
    const { id } = req.params;
    res.json({ msg: "GET SINGLE: " + id });
};

module.exports = {
    getAll,
    getSingle,
};
