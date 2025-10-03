import NavLogo from './NavLogo';
import NavSearch from './NavSearch';
import NavNumResults from './NavNumResults';

// 利用组件组合 解决 层级过深值传递问题
export default function Nav({children}) {
  return (
      <>
        <nav className="nav-bar">
          <NavLogo/>
          {children ? children : <p>null</p>}
        </nav>
      </>
  );
}