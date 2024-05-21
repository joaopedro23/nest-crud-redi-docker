import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Título do filme',
    example: 'The Shawshank Redemption',
  })
  title: string;

  @ApiProperty({
    description: 'Descrição do filme',
    example: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  })
  description: string;

  @ApiProperty({
    description: 'Diretor do filme',
    example: 'Frank Darabont',
  })
  director: string;

  @ApiProperty({
    description: 'Data de lançamento do filme',
    example: '1994-09-22',
    type: String,
    format: 'date',
  })
  releaseDate: Date;
}