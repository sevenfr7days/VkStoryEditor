import { Panel, PanelHeader, Header, Group, Div } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import bridge from "@vkontakte/vk-bridge";
import { Button } from '@vkontakte/vkui';

export const Home = ({ id }) => {

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      <Group header={<Header mode="secondary">Панель успешного успеха</Header>}>
        <Div>
          <Button stretched size="l" onClick={() => infoGypsyStory()}>Выложить в историю успешный успех</Button>
        </Div>
        <Div>
          <Button stretched size="l" onClick={() => dogStory()}>Выложить в историю собаку</Button>
        </Div>
      </Group>
    </Panel>
  );
};

async function infoGypsyStory(){
  await bridge.send('VKWebAppShowStoryBox', {
    background_type: 'image',
    url : "https://sevenfr7days.github.io/VkStoryEditor/src/assets/" + randomInteger(1, 35) + ".JPG"
  }
  )
}

async function dogStory() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        const imageUrl = data.message;
        await bridge.send(
            'VKWebAppShowStoryBox',
            {
            background_type: 'image',
            url: imageUrl
            }
        )
    } catch (error) {
        console.log('Error:', error);
    }
}


function randomInteger(min, max) {
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
