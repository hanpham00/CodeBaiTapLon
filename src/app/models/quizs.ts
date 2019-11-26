export class Quizs {
	Id: number;
	Text: string;
	Marks: number;
	AnswerId: number;
	Answers: [
		{
			Id: number;
			Text: string
		}
	];
}