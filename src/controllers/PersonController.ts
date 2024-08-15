import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { PersonDTO } from "../models/dto/PersonDTO";
import { PersonService } from "../services/PersonService";
import { BasicResponseDto } from "../models/dto/BasicResponseDTO";
import { Person } from "../models/Person";

@Route("person")
@Tags("Person")
export class PersonController extends Controller {
    personService = new PersonService();

    @Post()
    async createPerson(
        @Body() person: PersonDTO,
        @Res() success: TsoaResponse<201, BasicResponseDto>,
        @Res() fail: TsoaResponse<400, BasicResponseDto>
    ): Promise<void> {
        try {
            const newPerson = await this.personService.registerPerson(person);
            return success(201, new BasicResponseDto("Successfully created", newPerson));
        } catch (err: any) {
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Put()
    async updatePerson(
        @Body() person: PersonDTO,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise<void> {
        try {
            const updatedPerson = await this.personService.editPerson(person);
            return success(200, new BasicResponseDto("Successfully updated", updatedPerson));
        } catch (err) {
            return fail(404, new BasicResponseDto("Failed to update", undefined));
        }
    }

    @Delete()
    async deletePerson(
        @Body() person: PersonDTO,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise<void> {
        try {
            const deletedPerson = await this.personService.deletePerson(person);
            return success(200, new BasicResponseDto("Successfully deleted", deletedPerson));
        } catch (err) {
            return fail(404, new BasicResponseDto("Error on delete", err));
        }
    }

    @Get("id/{id}")
    async findPerson(
        @Path() id: number,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise<void> {
        try {
            const person = await this.personService.findPerson(id);
            return success(200, new BasicResponseDto("Successfully found", person));
        } catch (err) {
            return fail(404, new BasicResponseDto("Error on search", err));
        }
    }

    @Get("all")
    async findAllPerson(
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise<void> {
        try {
            const persons = await this.personService.getAllPerson();
            return success(200, new BasicResponseDto("Successfully found", persons));
        } catch (err) {
            return fail(404, new BasicResponseDto("Error on search", err));
        }
    }
}
