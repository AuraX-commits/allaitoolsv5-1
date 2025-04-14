
import { useState } from "react";
import { Replace } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchBar } from "./SearchBar";
import { ToolGrid } from "./ToolGrid";
import { useToolComparison } from "@/hooks/use-tool-comparison";

interface ReplaceToolButtonProps {
  toolId: string;
  onReplace: (oldToolId: string, newToolId: string) => void;
}

export const ReplaceToolButton = ({ toolId, onReplace }: ReplaceToolButtonProps) => {
  const [open, setOpen] = useState(false);
  const {
    searchTerm,
    setSearchTerm,
    displayTools,
    isLoading,
    selectedTools,
  } = useToolComparison();

  const handleToolSelect = (newToolId: string) => {
    onReplace(toolId, newToolId);
    setOpen(false);
    setSearchTerm("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
          aria-label="Replace tool"
        >
          <Replace className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Replace Tool</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onClear={() => setSearchTerm("")}
          />
          <ToolGrid
            tools={displayTools.filter(tool => !selectedTools.includes(tool.id) || tool.id === toolId)}
            selectedTools={[]}
            isLoading={isLoading}
            onToolSelect={handleToolSelect}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
