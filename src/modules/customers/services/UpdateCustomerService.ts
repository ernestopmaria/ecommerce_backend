import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Curstomer from "../typeorm/entities/Customer";
import CustomerRepository from "../typeorm/repositories/CustomersRepository";


interface IRequest {
	id:string;
	name: string;
	email: string;

}

class UpdateCustomerService {
	public async execute({ id, name, email}: IRequest): Promise<Curstomer> {
		const customersRepository = getCustomRepository(CustomerRepository);
		const customer = await customersRepository.findById(id);
		

		if (!customer) {
			throw new AppError('Cliente não encontrado');
		}

		const customerUpdateEmail = await customersRepository.findByEmail(email);

		if (customerUpdateEmail && customerUpdateEmail.id !== id ) {

			throw new AppError('Este email já está em uso');
		}
	



		customer.name=name
		customer.email=email
	
	    await customersRepository.save(customer)

	    return customer

		
	}
}
export default UpdateCustomerService;
