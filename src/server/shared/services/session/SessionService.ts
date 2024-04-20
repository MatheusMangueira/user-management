import { compare } from 'bcryptjs';
import { UserRepository } from '../../repository';
import { sign } from 'jsonwebtoken';

type UserRequest = {
  email: string;
  password: string;
};

export class SessionService {
  constructor(private userRepository: UserRepository) { }

  async execute({ email, password }: UserRequest) {

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Incorrect email/password combination');
    }

    const token = sign({}, process.env.SECRET_JWT as string, {
      subject: user.id,
    });

    return { token };

  }
}