import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    // Complete aqui
    const user = new User();
    Object.assign(user, { name, email, admin: false });
    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    // Complete aqui
    const userFind = this.users.find((user) => user.id === id);

    return userFind;
  }

  findByEmail(email: string): User | undefined {
    // Complete aqui
    const userFind = this.users.find((user) => user.email === email);

    return userFind;
  }

  turnAdmin(receivedUser: User): User {
    // Complete aqui
    const userIndex = this.users.findIndex(
      (user) => user.id === receivedUser.id
    );

    if (userIndex < 0) {
      throw new Error("User not found");
    }

    this.users[userIndex] = { ...this.users[userIndex], admin: true };
    return this.users[userIndex];
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
