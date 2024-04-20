import { CompaniesDTO } from '../../../DTOs/companies/CompaniesDTO';
import { CompaniesModel } from '../../../model/companies/CompaniesModel';
import { ICompaniesRepository } from '../../repository/types/IComponiesRepository';


export class CompaniesService {

  constructor(private companiesRepository: ICompaniesRepository) { }

  async create(companiesDto: CompaniesDTO) {


    try {
      const emailCompany = await this.companiesRepository.findByEmail(companiesDto.email);

      if (emailCompany?.email === companiesDto.email) {
        throw new Error('email in Company already exists');
      }

      const newCompany = new CompaniesModel(
        companiesDto.name,
        companiesDto.email,
        new Date());

      const createdCompany = await this.companiesRepository.create(newCompany);

      return createdCompany;
    } catch (err) {
      console.log(err, 'error in service');
      throw new Error('Error in create company');

    }

  }

  async getAll() {
    try {
      const companies = this.companiesRepository.getAll();
      return companies;
    } catch (err) {
      console.log(err, 'error in service');
      throw new Error('Error in get all companies');
    }

  }
}