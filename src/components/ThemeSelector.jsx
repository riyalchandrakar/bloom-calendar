import './Calendar.css';

const ThemeSelector = ({ currentTheme, onChangeTheme }) => {
  const themes = [
    { id: 'default', name: 'Default' },
    { id: 'dark', name: 'Dark' },
    { id: 'nature', name: 'Nature' },
    { id: 'romantic', name: 'Romantic' }
  ];

  return (
    <div className="theme-selector">
      {themes.map(theme => (
        <div
          key={theme.id}
          className={`theme-option theme-${theme.id} ${currentTheme === theme.id ? 'active' : ''}`}
          onClick={() => onChangeTheme(theme.id)}
          title={theme.name}
        />
      ))}
    </div>
  );
};

export default ThemeSelector;