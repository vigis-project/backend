import {
	ForbiddenException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserAddress } from './models/user-address.model';
import { User } from './models/users.model';
import { UserAddressCreationAttrs } from './types/user-address-creation-attrs.interface';
import { UpdateUserAddressDto } from './dto/request/update-user-address.dto';

@Injectable()
export class UserAddressService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		@InjectModel(UserAddress)
		private userAddressRepository: typeof UserAddress
	) {}

	async setDefaultAddress(userId: number) {
		const user = await this.userRepository.findByPk(userId, {
			include: UserAddress
		});

		if (user) {
			let defaultAddress: UserAddressCreationAttrs = {
				addrIndex: '000000',
				addrCity: 'Город не выбран',
				addrStreet: 'Улица не выбрана',
				addrHouse: '',
				addrStructure: '',
				addrApart: '',
				userId,
				isDefault: true
			};

			const newAddress = await UserAddress.create(defaultAddress);

			user.address = newAddress;
			await user.save();
		}
	}

	async findUserAddressById(id: number) {
		return await this.userAddressRepository.findByPk(id);
	}

	async findUserAddressByUserID(user: User, userId: number) {

		const address = await this.userAddressRepository.findOne({
			where: {
				userId
			}
		});
		if (address) {
			if (userId != user.id) {
				throw new ForbiddenException(
					`У Вас нет доступа к чужому адресу`
				);
			}
			return address;
		}
		throw new NotFoundException(
			`Адрес пользователя с id = ${userId} не найден`
		);
	}

	async updateUserAddressByUserId(
		user: User,
		userId: number,
		updateUserAddressDto: UpdateUserAddressDto
	) {
		const address = await this.userAddressRepository.findOne({
			where: { userId }
		});

		if (!address) {
			throw new NotFoundException(
				`Адрес пользователя с ID = ${userId} не найден`
			);
		}

		if (address.userId != user.id) {
			throw new ForbiddenException(
				'Вы не можете изменять или удалять этот адрес, так как он принадлежит другому пользователю'
			);
		}

		await address.update({
			addrIndex: updateUserAddressDto.addrIndex,
			addrCity: updateUserAddressDto.addrCity,
			addrStreet: updateUserAddressDto.addrStreet,
			addrHouse: updateUserAddressDto.addrHouse,
			addrStructure: updateUserAddressDto.addrStructure,
			addrApart: updateUserAddressDto.addrApart,
		});
		
		return address;
	}
}
