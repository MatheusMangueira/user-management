import { compare } from 'bcryptjs';
import { CompaniesRepository, UserRepository } from '../../repository';
import { sign } from 'jsonwebtoken';

type UserRequest = {
  email: string;
  password: string;
};

export class SessionService {
  constructor(
    private userRepository: UserRepository,
    private companiesRepository: CompaniesRepository
  ) { }

  async execute({ email, password }: UserRequest) {
    // Verifica se o usuário existe no repositório de usuários
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        throw new Error('Incorrect email/password combination');
      }

      const token = sign({}, process.env.SECRET_JWT as string, {
        subject: user.id
      });

      return { token };
    }

    // Verifica se a empresa existe no repositório de empresas
    const company = await this.companiesRepository.findByEmail(email);

    if (company) {
      const passwordMatch = await compare(password, company.password);

      if (!passwordMatch) {
        throw new Error('Incorrect email/password combination');
      }

      const token = sign({}, process.env.SECRET_JWT as string, {
        subject: company.id
      });

      return { token };
    }

    throw new Error('User not found');
  }
}
