import { getRepository, Repository } from 'typeorm';
import IUsersTokensRepository from '@modules/users/repositories/IUserTokenRepository';
import UserToken from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });
    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });
    try {
      await this.ormRepository.save(userToken);
    } catch (err) {
      console.log('Error', err);
    }
    return userToken;
  }
}

export default UsersTokensRepository;
