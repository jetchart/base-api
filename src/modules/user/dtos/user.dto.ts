import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  givenName: string;

  @IsString()
  @IsNotEmpty()
  familyName: string;

  @IsUrl()
  pictureUrl: string;

  @IsBoolean()
  isAdmin: boolean;

  constructor(
    email: string,
    name: string,
    givenName: string,
    familyName: string,
    pictureUrl: string,
    isAdmin: boolean = false,
  ) {
    this.email = email;
    this.name = name;
    this.givenName = givenName;
    this.familyName = familyName;
    this.pictureUrl = pictureUrl;
    this.isAdmin = isAdmin;
  }
}
