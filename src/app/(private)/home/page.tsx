import { ContentContainer } from "@/components/shared/container/container";
import UsersTable from "./__components__/table";

const Home = () => {
  return (
    <ContentContainer title="Usuários">
      <UsersTable />
    </ContentContainer>
  );
};

export default Home;
