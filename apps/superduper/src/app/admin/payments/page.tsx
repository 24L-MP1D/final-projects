'use client'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"
import { IconBrandVisa } from "@tabler/icons-react"

  
  const approvedSellRequest = [
    {
        ObjectId: "1",
        category: "Art",
    },
    {
        ObjectId: "2",
        category: "Jewellery",
    },
    {
        ObjectId: "3",
        category: "Car",
      },
     
  ]
  
  export default function TableDemo() {
    return (
    <div className="container w-[550px] peer-has-[]: mx-auto flex justify-center p-6 bg-slate-100 rounded-sm">
      <Table>
        <TableCaption>A list of your recent approved seller requests.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Category name</TableHead>
            <TableHead className="text-center">Approval status</TableHead>
            <TableHead className="text-center">Payment received</TableHead>
            <TableHead className="text-center">Payment via</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {approvedSellRequest.map((approved) => {
              return (
                  <TableRow key={approved.ObjectId}>
                      <TableCell>{approved.ObjectId}</TableCell>
                      <TableCell className="font-medium">{approved.category}</TableCell>
                      <TableCell className="text-center">Approved</TableCell>
                      <TableCell className="text-center">Yes</TableCell>
                      <TableCell className="text-center"><IconBrandVisa /></TableCell>
                  
                      
                  </TableRow>
              )
          })}
        </TableBody>
        
          <TableFooter>
          <TableRow>
          </TableRow>
        
            <div className="container mx-auto flex">
            <div><Button variant="outline" onClick={() => window.location.href="http://localhost:3000/admin"}>Close</Button></div>
            </div>
            
        </TableFooter>
        
  
      </Table>
      </div>
    )
  }
  