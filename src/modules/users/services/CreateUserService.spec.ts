import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });
    expect(user).toHaveProperty('id');
  });
});

describe('CreateUser', () => {
  it('should not be able to create a new user with same email as another', async () => {
    await createUser.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe2@example.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Jonh Doe',
        email: 'jonhdoe2@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
