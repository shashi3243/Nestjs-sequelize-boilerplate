import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'user',
  timestamps: true,
  underscored: true,
  freezeTableName: true,
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
  })
  firstName?: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email?: string;

  @Column({
    type: DataType.STRING,
  })
  password?: string;

  @Column({
    type: DataType.STRING,
  })
  lastName?: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userUuid?: string;

  @Column({
    type: DataType.INTEGER,
  })
  otp?: number;

  @Column({
    type: DataType.STRING,
  })
  phone?: string;

  @Column({
    type: DataType.DATE,
  })
  otpExpireTime?: Date;

  @Column({
    type: DataType.STRING,
  })
  resetPasswordToken?: string;

  @Column({
    type: DataType.DATE,
  })
  linkExpire?: Date;

  @Column({
    type: DataType.BOOLEAN,
  })
  isPhoneVerified?: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isTokenVerified?: boolean;
}
