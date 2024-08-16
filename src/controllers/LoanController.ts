import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, Tsoa, TsoaResponse } from "tsoa";
import { LoanDTO } from "../models/dto/LoanDTO";
import { LoanService } from "../services/LoanService";
import { BasicResponseDto } from "../models/dto/BasicResponseDTO";
import { Loan } from "../models/Loan";

@Route("loans")
@Tags("Loan")
export class LoanController extends Controller {
    loanService = new LoanService();

    @Post()
    async createLoan(
        @Body() loan: LoanDTO,
        @Res() success: TsoaResponse<201, BasicResponseDto>,
        @Res() fail: TsoaResponse<400, BasicResponseDto>
    ): Promise<void> {
        try {
            const newLoan = await this.loanService.registerLoan(loan);
            return success(201, new BasicResponseDto("Successfully created", newLoan));
        } catch (err: any) {
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Put()
    async updateLoan(
        @Body() loan: LoanDTO,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise<void> {
        try {
            const updatedLoan = await this.loanService.editLoan(loan);
            return success(200, new BasicResponseDto("Successfully updated", updatedLoan));
        } catch (err) {
            return fail(404, new BasicResponseDto("Failed to update " + err, undefined));
        }
    }

    @Delete("{id}")
    async deleteLoan(
        @Body() loan:LoanDTO,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise<void> {
        try {
            await this.loanService.deleteLoan(loan);
            return success(200, new BasicResponseDto("Successfully deleted", undefined));
        } catch (err) {
            return fail(404, new BasicResponseDto("Error on delete " + err, undefined));
        }
    }

    @Get("id/{id}")
    async findLoan(
        @Path() id: number,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise<void> {
        try {
            const loan = await this.loanService.findLoan(id);
            return success(200, new BasicResponseDto("Successfully found", loan));
        } catch (err) {
            return fail(404, new BasicResponseDto("Error on search " + err, undefined));
        }
    }

    @Get("all")
    async findAllLoans(
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise<void> {
        try {
            const loans = await this.loanService.getAllLoan();
            return success(200, new BasicResponseDto("Successfully found", loans));
        } catch (err) {
            return fail(404, new BasicResponseDto("Error on search" + err, undefined));
        }
    }

    @Get(`book/{id}`)
    async findByAllByBook(
        @Path() id:number,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise<void> {
        try {
            const loans = await this.loanService.getAllFromBook(id);
            return success(200, new BasicResponseDto("all loans from this book", loans));
        } catch(err) {
            return fail(404, new BasicResponseDto("error: " + err, undefined));
        }
    }
}
