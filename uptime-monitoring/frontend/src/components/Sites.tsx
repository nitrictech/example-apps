import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns/formatDistance";
import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "@/lib/constants";
import { AddSiteDialog } from "./AddSiteDialog";
import { RemoveSiteDialog } from "./RemoveSiteDialog";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import type { Site } from "@/types";

export function Sites() {
  const [siteToDelete, setSiteToDelete] = useState("");
  const [openAddSiteDialog, setOpenAddSiteDialog] = useState(false);

  const {
    isLoading,
    error,
    data = [],
  } = useQuery<Site[]>({
    queryKey: ["sites"],
    queryFn: () => fetch(`${API_BASE}/sites`).then((res) => res.json()),
    refetchInterval: 5000, // 5s
    retry: false,
  });

  if (error) {
    return <p>Error loading sites: {error.message}</p>;
  }

  return (
    <div>
      <Card className='xl:col-span-2'>
        <CardHeader className='flex flex-row items-center'>
          <div className='grid gap-2'>
            <CardTitle>Monitored Sites</CardTitle>
            <CardDescription>Refreshes every 1 minute</CardDescription>
          </div>
          <Button
            size='sm'
            onClick={() => setOpenAddSiteDialog(true)}
            className='ml-auto gap-1 flex items-center'
          >
            Add Site
            <PlusCircle className='h-4 w-4' />
          </Button>
        </CardHeader>
        <CardContent>
          {data.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Site</TableHead>
                  <TableHead className='sr-only text-right'></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map(({ up, lastChecked, url }) => (
                  <TableRow key={url}>
                    <TableCell>
                      <div className='font-semibold'>
                        {url}{" "}
                        <Badge variant={up ? "success" : "destructive"}>
                          {up ? "UP" : "DOWN"}
                        </Badge>
                      </div>
                      <div className='text-sm text-muted-foreground inline'>
                        Last checked:{" "}
                        {formatDistance(lastChecked, new Date(), {
                          addSuffix: true,
                        })}
                      </div>
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button
                        variant='outline'
                        onClick={() => setSiteToDelete(url)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className='flex flex-1 py-10 items-center justify-center'>
              <div className='flex flex-col items-center gap-1 text-center'>
                <h3 className='text-2xl font-bold tracking-tight'>
                  You have no sites
                </h3>
                <p className='text-sm text-muted-foreground'>
                  You can start monitoring as soon as you add a site.
                </p>
                <Button
                  className='mt-4 gap-1 flex items-center'
                  onClick={() => setOpenAddSiteDialog(true)}
                >
                  Add Site <PlusCircle className='h-4 w-4' />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <RemoveSiteDialog
        url={siteToDelete}
        onClose={() => setSiteToDelete("")}
      />
      <AddSiteDialog
        open={openAddSiteDialog}
        onClose={() => setOpenAddSiteDialog(false)}
      />
    </div>
  );
}
