import { UserDto } from './user.dto';

export class UserCredentialDto extends UserDto {
  jwt: string;

  constructor(user: UserDto, jwt: string) {
    super(
      user.email,
      user.name,
      user.givenName,
      user.familyName,
      user.pictureUrl,
      user.isAdmin,
    );
    this.jwt = jwt;
  }
}
