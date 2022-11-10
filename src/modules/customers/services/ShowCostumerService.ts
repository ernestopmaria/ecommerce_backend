import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Curstomer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest{
	id:string
}

class ShowCustomerService {
	public async execute({id}:IRequest): Promise<Curstomer> {
		const customerRepository = getCustomRepository(CustomerRepository);
		const customer = await customerRepository.findById(id);

		if(!customer){
			throw new AppError('Cliente não encontrado')
		}
		return customer;
	}
}

export default ShowCustomerService;
