import { useState } from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMUI from '@mui/material/Link';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Link } from "react-router";

const MenuElement = ({ pages, selectionId, selectionName }) => {

    const [submenuOpen, setSubmenuOpen] = useState(null)
    const [navigation, setNavigation] = useState([])


    const renderSubMenu = (pages, selectionId) => {

        return (
            <>
                <ul key={pages} className={submenuOpen === selectionId ? "navbar_link_submenu open" : "navbar_link_submenu"}>
                    {pages.map(page =>
                        <li key={page.documentId} className="submenu_link" >
                            <Link to={`/pages/${page.slug}`}>{page.name}</Link>
                            {page.children.length > 0 && <KeyboardDoubleArrowRightIcon onClick={() => {
                                if (page.children.length > 0) {
                                    setSubmenuOpen(page.documentId)
                                    setNavigation(prev => [...prev, { title: page.name, id: page.documentId }])
                                }
                            }}
                            />}
                        </li>
                    )}
                </ul>
                {
                    pages.map(e => (
                        e.children.length > 0 &&
                        renderSubMenu(e.children, e.documentId)
                    )
                    )
                }
            </>
        )

    }

    return (
        <>
            <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                    <LinkMUI underline="hover" onClick={() => {
                        setSubmenuOpen(null)
                        setNavigation([])
                    }}>
                        {selectionName}
                    </LinkMUI>
                    {navigation.map((e, i) =>
                        <LinkMUI underline="hover" onClick={() => {
                            setSubmenuOpen(e.id)
                            setNavigation(prev => prev.filter((element, index) => index <= i))
                        }}>
                            {e.title}
                        </LinkMUI>
                    )}
                </Breadcrumbs>
            </div>
            <div className="submenus" >
                {renderSubMenu(pages, selectionId)}
            </div>
        </>
    );
}

export default MenuElement;
