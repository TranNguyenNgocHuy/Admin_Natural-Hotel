import styled from 'styled-components'
import { createContext, useContext } from 'react'

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
`
interface CommonRowProps {
  columns: string
}
const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`

const StyledBody = styled.section`
  margin: 0.4rem 0;
`

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`

interface TableContextProps {
  columns: string
}
const TableContext = createContext<TableContextProps | undefined>(undefined)

interface TableProps {
  columns: string
  children: React.ReactNode
}

interface CommonProps {
  children: React.ReactNode
}

function Table({ columns, children }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role='table'>{children}</StyledTable>
    </TableContext.Provider>
  )
}
function Header({ children }: CommonProps) {
  const context = useContext(TableContext)
  if (!context) throw new Error('Header must be used within a Table')

  const { columns } = context
  return (
    <StyledHeader role='row' columns={columns} as={'header'}>
      {children}
    </StyledHeader>
  )
}

function Row({ children }: CommonProps) {
  const context = useContext(TableContext)
  if (!context) throw new Error('Header must be used within a Table')

  const { columns } = context
  return (
    <StyledRow role='row' columns={columns}>
      {children}
    </StyledRow>
  )
}

function Body({ children }: CommonProps) {
  return <StyledBody>{children}</StyledBody>
}

Table.Header = Header
Table.Body = Body
Table.Row = Row
Table.Footer = Footer

export default Table
