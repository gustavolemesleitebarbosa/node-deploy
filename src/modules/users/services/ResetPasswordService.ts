// import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokenRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
// import User from '../infra/typeorm/entities/User';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);
    if (!userToken) throw new AppError('User token does not exist');
    const user = await this.usersRepository.findById(userToken?.user_id);
    if (!user) throw new AppError('User  does not exist');
    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 12);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('token expired');
    }
    user.password = await this.hashProvider.generateHash(password);
    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
