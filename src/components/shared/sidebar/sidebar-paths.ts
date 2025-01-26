import { groupBy } from 'lodash';
import {
  HandMetal,
  Users
} from 'lucide-react';

type Groups = 'Usuários' | 'Star Wars';

interface AppPathMapping {
  path: string;
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  group: Groups;
}
interface PathGroup {
  title: string;
  items: AppPathMapping[];
}

export const appPathMapping: AppPathMapping[] = [
  {
    path: '/home',
    title: 'Todos os usuários',
    icon: Users,
    id: 'users',
    group: 'Usuários',
  }, 
  {
    path: '/swapi',
    title: 'Star Wars',
    icon: HandMetal,
    id: 'swapi',
    group: 'Star Wars',
  },
];

export const paths: PathGroup[] = [
  {
    title: 'Usuários',
    items: groupBy(appPathMapping, 'group')['Usuários'],
  },
   {
    title: 'Star Wars',
    items: groupBy(appPathMapping, 'group')['Star Wars'],
  },

];
