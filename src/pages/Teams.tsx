import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, Trash2 } from "lucide-react";
import { MembersTable } from "@/components/MembersTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Team {
  id: string;
  name: string;
  description: string;
  avatar: string;
  members: TeamMember[];
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);
  const [isDeleteTeamDialogOpen, setIsDeleteTeamDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);

  const handleCreateTeam = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const avatarFile = formData.get("avatar") as File;
    const newTeam: Team = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      avatar: avatarFile && avatarFile.size > 0 ? URL.createObjectURL(avatarFile) : "/placeholder.svg",
      members: []
    };
    setTeams([...teams, newTeam]);
    setIsTeamDialogOpen(false);
  };

  const handleAddMember = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedTeam) return;

    const formData = new FormData(event.currentTarget);
    const avatarFile = formData.get("avatar") as File;
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string,
      avatar: avatarFile && avatarFile.size > 0 ? URL.createObjectURL(avatarFile) : "/placeholder.svg"
    };

    const updatedTeams = teams.map(team => {
      if (team.id === selectedTeam.id) {
        return { ...team, members: [...team.members, newMember] };
      }
      return team;
    });

    setTeams(updatedTeams);
    setIsMemberDialogOpen(false);
  };

  const handleDeleteTeam = (teamId: string) => {
    setTeams(teams.filter(team => team.id !== teamId));
  };

  const handleDeleteMember = (teamId: string, memberId: string) => {
    const updatedTeams = teams.map(team => {
      if (team.id === teamId) {
        return { ...team, members: team.members.filter(member => member.id !== memberId) };
      }
      return team;
    });
    setTeams(updatedTeams);
  };

  const handleUpdateMember = (teamId: string, memberId: string, updatedData: Partial<TeamMember>) => {
    const updatedTeams = teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          members: team.members.map(member =>
            member.id === memberId ? { ...member, ...updatedData } : member
          )
        };
      }
      return team;
    });
    setTeams(updatedTeams);
  };

  // Get all members from all teams
  const allMembers = teams.flatMap(team =>
    team.members.map(member => ({
      ...member,
      teamName: team.name,
      teamId: team.id
    }))
  );

  return (
    <div className="space-y-8">
      <Header
        title="Teams"
        description="Manage your teams and team members"
      />

      <div className="flex justify-end">
        <Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateTeam} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Team Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar</Label>
                <Input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  className="cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file.size > 5 * 1024 * 1024) {
                      alert("File size should not exceed 5MB");
                      e.target.value = "";
                    }
                  }}
                />
              </div>
              <Button type="submit" className="w-full">Create Team</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map(team => (
          <Card key={team.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <img
                src={team.avatar || "/placeholder.svg"}
                alt={team.name}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
              <div>
                <CardTitle>{team.name}</CardTitle>
                <CardDescription>{team.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{team.members.length} members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Dialog open={isMemberDialogOpen} onOpenChange={setIsMemberDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTeam(team)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Team Member</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddMember} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" name="name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" type="email" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Input id="role" name="role" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="avatar">Avatar</Label>
                          <Input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            className="cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file && file.size > 5 * 1024 * 1024) {
                                alert("File size should not exceed 5MB");
                                e.target.value = "";
                              }
                            }}
                          />
                        </div>
                        <Button type="submit" className="w-full">Add Member</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setTeamToDelete(team);
                      setIsDeleteTeamDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>

      <Dialog open={isDeleteTeamDialogOpen} onOpenChange={setIsDeleteTeamDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Team</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to delete team {teamToDelete?.name}? This will remove all team members and cannot be undone.</p>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDeleteTeamDialogOpen(false);
                  setTeamToDelete(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (teamToDelete) {
                    setTeams(teams.filter(team => team.id !== teamToDelete.id));
                    setIsDeleteTeamDialogOpen(false);
                    setTeamToDelete(null);
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">All Team Members</h2>
        <MembersTable
          members={allMembers}
          onDeleteMember={handleDeleteMember}
          onUpdateMember={handleUpdateMember}
        />
      </div>
    </div>
  );
}