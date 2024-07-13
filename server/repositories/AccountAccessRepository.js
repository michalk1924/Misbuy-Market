
const { NotFoundException, ConflictException } = require('../Exception');

const usersRepository = require('../repositories/UsersRepository');

class AccountAccessRipository {

    async SignIn(email) {
        const user = await usersRepository.get({ "email": email });
        if (!user)
            throw new NotFoundException("User not found");
        return user;
    }

    async SignUp(user) {
        const userData = await usersRepository.get({ "email": user.email }); //use(user.email)//
        if (userData != null)
            throw new ConflictException("User exists");
        const userId = await usersRepository.insert(user);
        return userId;
    }

}
module.exports = new AccountAccessRipository();