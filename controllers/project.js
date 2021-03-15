exports.getProjects = async (req, res) => {
    let { cid } = req.params;
    // let projects = await Project.find({ company: cid })
    // return res.json({ success: true, data: projects })
}

exports.getProject = async (req, res) => {
    let { pid } = req.params;
    // let project = await Project.findOne({ user: req.user._id, _id: pid })
    // if (!project) return res.json({ success: false, message: 'No project found' })
    // return res.json({ success: true, data: project })
}

exports.addProject = async (req, res) => {
    let { cid } = req.params;
    let { name } = req.body
    // if (!name) return res.json({ success: false, message: 'Please add name' })

    // let newProject = new Project({
    //     name,
    //     company: cid,
    //     user: req.user._id
    // })

    // await newProject.save()
    // res.json({ success: true, data: newProject, message: "New Project saved" })
}

exports.deleteProject = async (req, res) => {
    let { pid } = req.params;
    // if (!id) return res.json({ success: false, message: 'Error! Please try again later' })

    // let project = await Project.findOne({ user: req.user._id, _id: pid })
    // if (!project) return res.json({ success: false, message: 'No project with this id' })

    // await Project.deleteOne({ _id: pid })
    // res.json({ success: true, data: project, message: "project deleted" })
}
