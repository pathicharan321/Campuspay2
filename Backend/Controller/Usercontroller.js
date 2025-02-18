const zod=require("zod");
const User=require('../Schema/user');

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

module.exports.putupdate=async(req,res)=>{
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
  try{
    await User.updateOne(
        { _id: req.userid }, 
        { $set: req.body }
    )
    res.json({
        message: "Updated successfully"
    })
  }
  catch(err){
    return res.status(500).json({"message":err});
   } 
}


module.exports.getbulk = async (req, res) => {
    console.log("getbulk function called"); 
    try {
        console.log(req.params.filter);
        const filter = req.params.filter || "";
        console.log(`Filter received: ${filter}`); 
        const users = await User.find({
            $or: [
                { firstName: { $regex: filter, $options: "i" } },
                { lastName: { $regex: filter, $options: "i" } }
            ]
        });
        res.json({
            user: users.map(user => ({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username
            }))
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users" });
    }
};
