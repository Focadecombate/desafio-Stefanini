import { AccountPrismaRepository } from './account';
import { prismaHelper } from '../utils/prisma-client';
describe('', () => {
  beforeAll(async () => {
    await prismaHelper.connect();
  });
  beforeEach(async () => {
    await prismaHelper.prismaClient.user.deleteMany({});
  });
  afterAll(async () => {
    await prismaHelper.prismaClient.$disconnect();
  });
  describe('Add()', () => {
    test('should return an account on add success', async () => {
      const sut = new AccountPrismaRepository();
      const account = await sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        age: 20,
      });

      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email@mail.com');
      expect(account.password).toBe('any_password');
    });
  });
  describe('LoadByEmail()', () => {
    test('should return an account on loadByEmail success', async () => {
      const sut = new AccountPrismaRepository();
      await sut.add({
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        age: 20,
      });
      const account = await sut.loadByEmail('any_email@mail.com');

      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email@mail.com');
      expect(account.password).toBe('any_password');
    });
    test('should return null if loadByEmail fails', async () => {
      const sut = new AccountPrismaRepository();

      const account = await sut.loadByEmail('any_email@mail.com');

      expect(account).toBeFalsy();
    });
  });
  describe('LoadByToken()', () => {
    test('should return an account on loadByToken ', async () => {
      const sut = new AccountPrismaRepository();
      await prismaHelper.prismaClient.user.create({
        data: {
          email: 'any_email@mail.com',
          name: 'any_name',
          password: 'hash_password',
          id: 'any_token',
          age: 20,
        },
      });
      const account = await sut.loadByToken('any_token');

      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email@mail.com');
      expect(account.password).toBe('hash_password');
    });
  });
  describe('Disable()', () => {
    test('should set account to disable if id exists', async () => {
      const sut = new AccountPrismaRepository();
      await prismaHelper.prismaClient.user.create({
        data: {
          email: 'any_email@mail.com',
          name: 'any_name',
          password: 'hash_password',
          id: 'any_token',
          age: 20,
        },
      });
      sut.disable('any_token');
      const user = await prismaHelper.prismaClient.user.findUnique({
        where: { id: 'any_token' },
      });
      expect(user.isActive).toBe(false);
    });
    test("should throw if id doesn't exist", async () => {
      const sut = new AccountPrismaRepository();
      const promise = sut.disable('any_token');
      expect(promise).rejects.toThrow();
    });
  });
});
