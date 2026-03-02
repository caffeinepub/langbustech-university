import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Struct__5 as Accreditation,
  Struct__4 as Certification,
  Struct__3 as CorporateProgram,
  Struct__2 as Course,
  Struct__6 as InquirySubmission,
  Message,
  Struct__1 as Publication,
  Struct as Recognition,
  Type,
} from "../backend";
import { useActor } from "./useActor";

export type {
  Course,
  CorporateProgram,
  Publication,
  Certification,
  Accreditation,
  Recognition,
  InquirySubmission,
  Message,
};

export function useGetAllCourses() {
  const { actor, isFetching } = useActor();
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCourses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCorporateCustomizableCourses() {
  const { actor, isFetching } = useActor();
  return useQuery<Course[]>({
    queryKey: ["corporate-customizable-courses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCorporateCustomizableCourses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllCorporatePrograms() {
  const { actor, isFetching } = useActor();
  return useQuery<CorporateProgram[]>({
    queryKey: ["corporate-programs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCorporatePrograms();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllPublications() {
  const { actor, isFetching } = useActor();
  return useQuery<Publication[]>({
    queryKey: ["publications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPublications();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPublicationsByType(pubType: Type) {
  const { actor, isFetching } = useActor();
  return useQuery<Publication[]>({
    queryKey: ["publications", pubType],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublicationByType(pubType);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllCertifications() {
  const { actor, isFetching } = useActor();
  return useQuery<Certification[]>({
    queryKey: ["certifications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCertifications();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCertificationsByRecipient(recipientName: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Certification[]>({
    queryKey: ["certifications", "recipient", recipientName],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCertificationsByRecipient(recipientName);
    },
    enabled: !!actor && !isFetching && recipientName.length > 0,
  });
}

export function useGetAllAccreditations() {
  const { actor, isFetching } = useActor();
  return useQuery<Accreditation[]>({
    queryKey: ["accreditations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAccreditations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllRecognitions() {
  const { actor, isFetching } = useActor();
  return useQuery<Recognition[]>({
    queryKey: ["recognitions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRecognitions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (inquiry: InquirySubmission) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitInquiry(inquiry);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}

export function useCreateAIAdvisorSession() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (sessionId: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createAIAdvisorSession(sessionId);
    },
  });
}

export function useAddAIAdvisorMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      sessionId,
      message,
    }: { sessionId: bigint; message: Message }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addAIAdvisorMessage(sessionId, message);
    },
  });
}
