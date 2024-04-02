import { keccak256, toBytes } from "viem";
import { deployment } from "./deployment";

export enum DepartmentTags {
  Dispute = "DISPUTE",
  CoreMember = "COREMEMBER",
  Expert = "EXPERT",
}

export const departments = [
  {
    name: "Dispute",
    description: "Openmesh OpenR&D Dispute Service Provider",
    tag: keccak256(toBytes(DepartmentTags.Dispute)),
    smart_account: deployment.smartAccounts.departments.disputeDepartment,
    crosschain_account: deployment.crossChainDepartments.disputeDepartment,
    dao: deployment.departments.departmentDaos.disputeDepartment,
  },
  {
    name: "Core Member",
    description: "Openmesh Core Member Team",
    tag: keccak256(toBytes(DepartmentTags.CoreMember)),
    smart_account: deployment.smartAccounts.departments.coreMemberDepartment,
    crosschain_account: deployment.crossChainDepartments.coreMemberDepartment,
    dao: deployment.departments.departmentDaos.coreMemberDepartment,
  },
  {
    name: "Expert Network",
    description: "Openmesh Expert Network",
    tag: keccak256(toBytes(DepartmentTags.Expert)),
    smart_account: deployment.smartAccounts.departments.expertDepartment,
    crosschain_account: deployment.crossChainDepartments.expertDepartment,
    dao: deployment.departments.departmentDaos.expertDepartment,
  },
] as const;
