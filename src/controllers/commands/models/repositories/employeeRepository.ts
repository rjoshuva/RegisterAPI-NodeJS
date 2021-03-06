import Bluebird from "bluebird";
import Sequelize from "sequelize";
import { EmployeeFieldName } from "../constants/fieldNames/employeeFieldNames";
import { EmployeeAttributes, EmployeeEntity, EmployeeInstance } from "../entities/employeeEntity";

export let queryById = (id: string, queryTransaction?: Sequelize.Transaction): Bluebird<EmployeeInstance | null> => {
	return EmployeeEntity.findOne(<Sequelize.FindOptions<EmployeeAttributes>>{
		transaction: queryTransaction,
		where: <Sequelize.WhereOptions<EmployeeAttributes>>{ id: id }
	});
};

export let queryByLookupCode = (lookupCode: string, queryTransaction?: Sequelize.Transaction): Bluebird<EmployeeInstance | null> => {
	return EmployeeEntity.findOne(<Sequelize.FindOptions<EmployeeAttributes>>{
		transaction: queryTransaction,
		where: <Sequelize.WhereOptions<EmployeeAttributes>>{ lookupCode: lookupCode }
	});
};

export let queryAll = (): Bluebird<EmployeeInstance[]> => {
	return EmployeeEntity.findAll(<Sequelize.FindOptions<EmployeeAttributes>>{
		order: [ [EmployeeFieldName.CreatedOn, "ASC"] ]
	});
};

export let create = (newEmployee: EmployeeAttributes, createTransaction?: Sequelize.Transaction): Bluebird<EmployeeInstance> => {
	return EmployeeEntity.create(
		newEmployee,
		<Sequelize.CreateOptions>{
			transaction: createTransaction
		});
};

export let destroy = (employeeListEntry: employeeInstance, destroyTransaction?: Sequelize.Transaction): Bluebird<void> => {
	return employeeListEntry.destroy(
		<Sequelize.InstanceDestroyOptions>{
			transaction: destroyTransaction
		});
};
