const express = require('express');
const router = express.Router();
const members = require('../../Member');
const uuid = require('uuid');
// TODO Get all members
router.get('/', (req, res) => {
    res.json(members);
});

// TODO Get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({
            msg: `Member with the id of ${req.params.id} not found`
        });
    }
});

// TODO Create a member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        sex: req.body.sex,
        dob: req.body.dob
    };
    if (!newMember.name || !newMember.sex)
        return res.status(400).json({ msg: 'Please fill out full format' });

    members.push(newMember);
    res.redirect('/');
});

// TODO Update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        const updateMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.dob = updateMember.dob ? updateMember.dob : member.dob;
                member.sex = updateMember.sex ? updateMember.sex : member.sex;
                res.json({
                    msg: 'updated',
                    member
                });
            }
        })
    } else {
        res.status(400).json({
            msg: `Member with the id of ${req.params.id} not found`
        });
    }
});

// TODO Delete member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json({ msg: 'deleted', members: members.filter(member => member.id !== parseInt(req.params.id)) });
    } else {
        res.status(400).json({
            msg: `Member with the id of ${req.params.id} not found`
        });
    }
});

module.exports = router;