import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserAddress } from './models/user-address.model';
import { User } from './models/users.model';
import { UserAddressCreationAttrs } from './types/user-address-creation-attrs.interface';

@Injectable()
export class UserAddressService {
	constructor(@InjectModel(User) private userRepository: typeof User) {}

	async setDefaultAddress(idUser: number) {
		const user = await this.userRepository.findByPk(idUser, {
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
				idUser: user.id,
				isDefault: true
			};

			const newAddress = await UserAddress.create(defaultAddress);

			user.address = newAddress;
			await user.save();
		}
	}
}
