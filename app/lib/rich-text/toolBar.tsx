import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { ToggleGroupItem, ToggleGroup } from '@/components/ui/toggle-group';
import { useEffect, useState } from 'react';
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaUnderline,
  FaParagraph,
  FaListOl,
  FaListUl,
} from 'react-icons/fa';
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4 } from 'react-icons/lu';

const ToolbarActionsDropdown = (editor: any) => {
  return [
    {
      icon: <LuHeading1 />,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 }),
      name: 'Cabeçalho 1',
    },
    {
      icon: <LuHeading2 />,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
      name: 'Cabeçalho 2',
    },
    {
      icon: <LuHeading3 />,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive('heading', { level: 3 }),
      name: 'Cabeçalho 3',
    },
    {
      icon: <LuHeading4 />,
      action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: editor.isActive('heading', { level: 4 }),
      name: 'Cabeçalho 4',
    },
    {
      icon: <FaParagraph />,
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: editor.isActive('paragraph'),
      name: 'Paragrafo',
    },
  ];
};

const ToolbarToggles = (editor: any) => {
  return [
    {
      icon: <FaBold />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      name: 'bold',
    },
    {
      icon: <FaItalic />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      name: 'italic',
    },
    {
      icon: <FaUnderline />,
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive('underline'),
      name: 'underline',
    },
    {
      icon: <FaStrikethrough />,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
      name: 'strike',
    },
  ];
};

const ToolbarList = (editor: any) => {
  return [
    {
      icon: <FaListUl />,
      name: 'Lista de Marcadores',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
    },
    {
      icon: <FaListOl />,
      name: 'Listagem Numerada',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
    },
  ];
};

export default function Toolbar({ editor }: any) {
  const [dropdownName, setDropdownName] = useState('paragraph');

  useEffect(() => {
    if (editor.isActive('heading', { level: 1 })) {
      setDropdownName('Cabeçalho 1');
    }
    if (editor.isActive('heading', { level: 2 })) {
      setDropdownName('Cabeçalho 2');
    }
    if (editor.isActive('heading', { level: 3 })) {
      setDropdownName('Cabeçalho 3');
    }
    if (editor.isActive('heading', { level: 4 })) {
      setDropdownName('Cabeçalho 4');
    }
    if (editor.isActive('paragraph')) {
      setDropdownName('Paragrafo');
    }
  }, [
    editor.isActive('heading', { level: 1 }),
    editor.isActive('heading', { level: 2 }),
    editor.isActive('heading', { level: 3 }),
    editor.isActive('heading', { level: 4 }),
    editor.isActive('paragraph'),
  ]);
  return (
    <div className=" p-1 bg-white rounded-md border mb-2 flex gap-4">
      <ToggleGroup variant="default" type="multiple">
        {ToolbarToggles(editor).map((action: any) => {
          return (
            <ToggleGroupItem key={action.name} value={action.name} onClick={() => action.action()}>
              {action.icon}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>

      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-gray-800 hover:text-white px-2 rounded-md">
          <span>{dropdownName}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {ToolbarActionsDropdown(editor).map((action: any) => {
            return (
              <DropdownMenuItem className="gap-1" key={action.name} onClick={action.action}>
                {action.icon} {action.name}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-gray-800 hover:text-white px-2 rounded-md">
          <span>Listagem</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {ToolbarList(editor).map((action: any) => {
            return (
              <DropdownMenuCheckboxItem
                className="gap-1"
                key={action.name}
                onClick={action.action}
                checked={action.isActive}
              >
                {action.icon} {action.name}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
