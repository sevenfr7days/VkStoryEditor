import { Panel, PanelHeader, Header, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
// import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import bridge from "@vkontakte/vk-bridge";

export const Home = ({ id, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  // const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      {fetchedUser && (
        <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
          <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          {/*<Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push('persik')}>*/}
          {/*  Покажите Персика, пожалуйста!*/}
          {/*</Button>*/}
          <button onClick={() => openStoryEditor()}>Пустить пылиииии в глаза</button>
        </Div>
      </Group>
    </Panel>
  );
};

function openStoryEditor(){
  bridge.send('VKWebAppShowStoryBox', {
    background_type: 'image',
    url : "https://sevenfr7days.github.io/VkStoryEditor/src/assets/" + randomInteger(1, 12) + ".JPG",
    attachment: {
      text: 'book',
      type: 'photo',
      owner_id: 743784474,
      id: 12345678
    }})
      .then((data) => {
        if (data.code_data) {
          // Редактор историй открыт
          console.log(data);
        }})
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
}

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

Home.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};
