const ContactService  = require('../services/contact.service');
const ApiError = require('../api-error');

exports.create = async( req , res , next ) => {
    if ( !req.body?.name ) {
         return next ( new ApiError ( 400 , 'Name can not be empty'));
    }
    try {
         const contactService = new ContactService();
         const contact = await contactService.create ( req.body );
         return res.send (contact) ;
    } catch ( error ) {
         console.log ( error ) ;
         return next (
             new ApiError ( 500 , 'An error occurred while creating the contact')
        );
    }
};

// Retrieve all contacts of a user from the database
exports.findAll = async(req , res , next) => {
    let contacts = [ ];
    try {
         const contactService = new ContactService();
         const { name } = req.query ;
         if ( name ) {
              contacts = await contactService.findByName (name);
         } else {
              contacts = await contactService.all();
         }
    } catch (error) {
         console.log (error) ;
         return next (
              new ApiError ( 500 , 'An error occurred while retrieving contacts')
         );
    }
    return res.send ( contacts ) ;
};


//exports.create = (reg, res) => {
//   return res.send({ message: 'create handler' });
//};
//exports. findAll = (reg, res) => {
    //return res.send({ message: 'findAll handler' });
//};
/*exports.findOne = (req, res) => {
    return res.send({ message: 'findOne handler' });
};
exports.update = (req, res) => {
    return res.send({ message: 'update handler' });
};
exports.delete = (req, res) => {
    return res.send({ message: 'delete handler' });
};
exports.deleteAll = (reg, res) => {
    return res.send({ message: 'deleteAll handler' });
};
exports.findAllFavorite = (reg, res) => {
    return res.send({ message: 'findAllFavorite handler' });
};*/