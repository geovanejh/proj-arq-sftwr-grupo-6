import { PageHeaderContainer } from "./PageHeader.styled";

const PageHeader = ({ title }) => {
  return (
    <PageHeaderContainer>
      <h1>{title}</h1>
    </PageHeaderContainer>
  );
};

export default PageHeader;
