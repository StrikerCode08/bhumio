import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('update')
  async createPdf(
    @Body() payload: any,
  ): Promise<{ message: string; fileName: string }> {
    try {
      const fileName = await this.appService.createPdf(payload);
      return { message: 'PDF created successfully', fileName };
    } catch (error) {
      throw new HttpException(
        'Error creating PDF',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('read/:fileName')
  async readPdf(
    @Param('fileName') fileName: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const parsedData = await this.appService.readPdf(fileName);
      const lines = parsedData.text
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
      const questions = [];
      let currentQuestion = '';
      let options = [];
      lines.forEach((line, index) => {
        const isQuestion = /\d+\.\s+/.test(line) || line.endsWith('?');
        if (isQuestion) {
          if (currentQuestion) {
            questions.push({
              id:uuidv4(),
              question: currentQuestion,
              options: options.length > 0 ? options : 'Text',
              answer:""
            });
            options = [];
          }
          currentQuestion = line;
        } else if (/ Yes\s+ No\s+ Unknown\s+ NA/.test(line)) {
          options = ['Yes', 'No', 'Unknown', 'NA'];
        } else if (/ Yes\s+ No/.test(line)) {
          options = ['Yes', 'No'];
        } else if (/ Yes/.test(line)) {
          options.push('Yes');
        }
      });

      // Push the last question into the array
      if (currentQuestion) {
        questions.push({
          id:uuidv4(),
          question: currentQuestion,
          options: options.length > 0 ? options : 'Text',
          answer:""
        });
      }

      res.json(questions);
    } catch (error) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
  }
}
