const knex = require('../database/knex');

class ContactService {
    constructor(){
        this.contacts = knex('contacts');
    }
    //Define
    
    #getContact ( payload ) {
        const contact = { ... payload } ;
        const contactProperties = [
            "name" , "email" , "address" , "phone" , " favorite "
        ] ;
        // Remove non - contact properties
        Object.keys ( contact ) .forEach ( function (key) {
            if ( contactProperties.indexOf (key) == -1 ) {
                delete contact[ key ] ;
            }
        });
        return contact ;
    }
    async create ( payload ) {
        const contact = this.#getContact(payload) ;
        const [id] = await this.contacts.insert(contact);          
        return { id , ... contact } ;            
    }
    async all(){
        return await this.contacts.select ('*');
    }
    async findByName(name)  {
        return await this.contacts
            .where ('name' , 'like' , `%${name}%`) 
            .select ('*') ;
    }
        
}

module.exports = ContactService;