import Link from 'next/link';
import styled from '@emotion/styled';

const Title = styled(Link)`
  color: black;
  text-decoration: none;
`;

const TitleCell = (value: string, id: any) => (
  <Title href={`/joke/${id}`}>{value}</Title>
);

export default TitleCell;
