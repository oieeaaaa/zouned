import { useState } from 'react';
import Nav from './nav/nav';
import componentList from './component-list';
import GridGuides from './grid-guide';

export default () => {
  const [activeComponent, setActiveComponent] = useState('');

  const renderComponents = (list) => {
    if (!activeComponent) return '';

    const Component = list.reduce((comp, curComp) => {
      if (activeComponent === curComp.name) {
        comp = curComp.component;
      }

      return comp;
    }, '');

    return <Component />;
  };

  return (
    <div className="styleguide">
      <Nav active={activeComponent} onSetActive={setActiveComponent} />
      <main className="styleguide-main grid">
        {renderComponents(componentList)}
      </main>
      <GridGuides />
    </div>
  );
};
