import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
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

    @Put("{id}")
    async updateLoan(
        @Path() id: number,
        @Body() loan: Loan,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise<void> {
        try {
            loan.id = id;
            const updatedLoan = await this.loanService.editLoan(loan);
            return success(200, new BasicResponseDto("Successfully updated", updatedLoan));
        } catch (err) {
            return fail(404, new BasicResponseDto("Failed to update", undefined));
        }
    }

    @Delete("{id}")
    async deleteLoan(
        @Path() id: number,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise<void> {
        try {
            await this.loanService.deleteLoan(id);
            return success(200, new BasicResponseDto("Successfully deleted", undefined));
        } catch (err) {
            return fail(404, new BasicResponseDto("Error on delete", err));
        }
    }

    @Get("{id}")
    async findLoan(
        @Path() id: number,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise<void> {
        try {
            const loan = await this.loanService.findLoan(id);
            return success(200, new BasicResponseDto("Successfully found", loan));
        } catch (err) {
            return fail(404, new BasicResponseDto("Error on search", err));
        }
    }

    @Get("all")
    async findAllLoans(
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise<void> {
        try {
            const loans = await this.loanService.getAllLoans();
            return success(200, new BasicResponseDto("Successfully found", loans));
        } catch (err) {
            return fail(404, new BasicResponseDto("Error on search", err));
        }
    }
}
