import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Curstomer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest{
	id:string
}

class ShowCustomerProfileService {
	public async execute({id}:IRequest): Promise<Curstomer> {
		const customerRepository = getCustomRepository(CustomerRepository);
		const customer = await customerRepository.findById(id);

		if(!customer){
			throw new AppError('Customer not found')
		}
		return customer;
	}
}

export default ShowCustomerProfileService;
