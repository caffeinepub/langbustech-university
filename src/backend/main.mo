import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import List "mo:core/List";
import Order "mo:core/Order";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";

actor {
  module Course {
    public type Category = {
      #serviceTraining;
      #professionalDevelopment;
      #leadership;
      #aiSkills;
      #businessTransformation;
    };

    public type Struct = {
      id : Nat;
      title : Text;
      description : Text;
      category : Category;
      duration : Nat;
      level : Text;
      isCorporateCustomizable : Bool;
      corporateAlignment : Text;
    };

    public func compare(course1 : Struct, course2 : Struct) : Order.Order {
      switch (Text.compare(course1.title, course2.title)) {
        case (#equal) { Nat.compare(course1.duration, course2.duration) };
        case (order) { order };
      };
    };
  };

  module CorporateProgram {
    public type Status = {
      #inquiry;
      #active;
      #completed;
    };

    public type Struct = {
      id : Nat;
      companyName : Text;
      programTitle : Text;
      description : Text;
      customRequirements : Text;
      status : Status;
    };

    public func compareByCompany(c1 : Struct, c2 : Struct) : Order.Order {
      Text.compare(c1.companyName, c2.companyName);
    };
  };

  module Publication {
    public type Type = {
      #white;
      #orange;
      #intelligence;
    };

    public type Struct = {
      id : Nat;
      title : Text;
      type_ : Type;
      abstract : Text;
      publishedDate : Time.Time;
      authorName : Text;
      downloadUrl : Text;
    };

    public func compareByDate(p1 : Struct, p2 : Struct) : Order.Order {
      Int.compare(p1.publishedDate, p2.publishedDate);
    };
  };

  module Certification {
    public type Struct = {
      id : Nat;
      certName : Text;
      description : Text;
      requirements : Text;
      issueDate : Time.Time;
      credentialId : Text;
      recipientName : Text;
      isVerified : Bool;
    };

    public func compareByRecipient(c1 : Struct, c2 : Struct) : Order.Order {
      Text.compare(c1.recipientName, c2.recipientName);
    };
  };

  module Accreditation {
    public type Struct = {
      id : Nat;
      bodyName : Text;
      accreditationType : Text;
      dateGranted : Time.Time;
      expiryDate : ?Time.Time;
      description : Text;
    };

    public func compareByDate(a1 : Struct, a2 : Struct) : Order.Order {
      Int.compare(a1.dateGranted, a2.dateGranted);
    };
  };

  module Recognition {
    public type Struct = {
      id : Nat;
      title : Text;
      awardBody : Text;
      year : Nat;
      description : Text;
      category : Text;
    };

    public func compareByYear(r1 : Struct, r2 : Struct) : Order.Order {
      Nat.compare(r1.year, r2.year);
    };
  };

  module Inquiry {
    public type Type = {
      #enrollment;
      #corporatePartnership;
      #courseCustomization;
      #general;
    };

    public type Struct = {
      id : Nat;
      name : Text;
      email : Text;
      organization : Text;
      inquiryType : Type;
      message : Text;
      submittedAt : Time.Time;
    };

    public func compareByDate(i1 : Struct, i2 : Struct) : Order.Order {
      Int.compare(i1.submittedAt, i2.submittedAt);
    };
  };

  module AIAdvisor {
    public type Message = {
      role : Text;
      content : Text;
    };

    public type Session = {
      id : Nat;
      sessionId : Text;
      messages : [Message];
      recommendations : [Text];
    };
  };

  public type UserProfile = {
    name : Text;
  };

  var nextCourseId = 1;
  var nextProgramId = 1;
  var nextPublicationId = 1;
  var nextCertificationId = 1;
  var nextAccreditationId = 1;
  var nextRecognitionId = 1;
  var nextInquiryId = 1;
  var nextSessionId = 1;

  let courses = Map.empty<Nat, Course.Struct>();
  let corporatePrograms = Map.empty<Nat, CorporateProgram.Struct>();
  let publications = Map.empty<Nat, Publication.Struct>();
  let certifications = Map.empty<Nat, Certification.Struct>();
  let accreditations = Map.empty<Nat, Accreditation.Struct>();
  let recognitions = Map.empty<Nat, Recognition.Struct>();
  let inquiries = Map.empty<Nat, Inquiry.Struct>();
  let aiAdvisorSessions = Map.empty<Nat, AIAdvisor.Session>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  include MixinStorage();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Course CRUD
  public shared ({ caller }) func createCourse(course : Course.Struct) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create courses");
    };
    let courseId = nextCourseId;
    let newCourse = {
      course with id = courseId;
    };
    courses.add(courseId, newCourse);
    nextCourseId += 1;
    courseId;
  };

  public query func getCourse(id : Nat) : async ?Course.Struct {
    courses.get(id);
  };

  public query func getAllCourses() : async [Course.Struct] {
    courses.values().toArray().sort();
  };

  public shared ({ caller }) func updateCourse(id : Nat, course : Course.Struct) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update courses");
    };
    switch (courses.get(id)) {
      case (null) { Runtime.trap("Course not found") };
      case (?_) {
        let updatedCourse = {
          course with id;
        };
        courses.add(id, updatedCourse);
      };
    };
  };

  public shared ({ caller }) func deleteCourse(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete courses");
    };
    switch (courses.get(id)) {
      case (null) { Runtime.trap("Course not found") };
      case (?_) {
        courses.remove(id);
      };
    };
  };

  public query func getCorporateCustomizableCourses() : async [Course.Struct] {
    courses.values().toArray().filter(func(course) { course.isCorporateCustomizable });
  };

  public shared ({ caller }) func uploadCourseMaterial(courseId : Nat, filePath : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can upload course materials");
    };

    switch (courses.get(courseId)) {
      case (null) { Runtime.trap("Course not found") };
      case (?_) {};
    };
  };

  // Corporate Program CRUD
  public shared ({ caller }) func createCorporateProgram(program : CorporateProgram.Struct) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create corporate programs");
    };
    let programId = nextProgramId;
    let newProgram = {
      program with id = programId;
    };
    corporatePrograms.add(programId, newProgram);
    nextProgramId += 1;
    programId;
  };

  public query func getCorporateProgram(id : Nat) : async ?CorporateProgram.Struct {
    corporatePrograms.get(id);
  };

  public query func getAllCorporatePrograms() : async [CorporateProgram.Struct] {
    corporatePrograms.values().toArray();
  };

  public shared ({ caller }) func updateCorporateProgram(id : Nat, program : CorporateProgram.Struct) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update corporate programs");
    };
    switch (corporatePrograms.get(id)) {
      case (null) { Runtime.trap("Program not found") };
      case (?_) {
        let updatedProgram = {
          program with id;
        };
        corporatePrograms.add(id, updatedProgram);
      };
    };
  };

  public shared ({ caller }) func updateCorporateProgramStatus(id : Nat, status : CorporateProgram.Status) : async () {
    switch (corporatePrograms.get(id)) {
      case (null) { Runtime.trap("Program not found") };
      case (?program) {
        let updatedProgram = {
          program with status;
        };
        corporatePrograms.add(id, updatedProgram);
      };
    };
  };

  public shared ({ caller }) func deleteCorporateProgram(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete corporate programs");
    };
    switch (corporatePrograms.get(id)) {
      case (null) { Runtime.trap("Program not found") };
      case (?_) {
        corporatePrograms.remove(id);
      };
    };
  };

  // Publications CRUD
  public shared ({ caller }) func createPublication(publication : Publication.Struct) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create publications");
    };
    let publicationId = nextPublicationId;
    let newPublication = {
      publication with id = publicationId;
    };
    publications.add(publicationId, newPublication);
    nextPublicationId += 1;
    publicationId;
  };

  public query func getPublication(id : Nat) : async ?Publication.Struct {
    publications.get(id);
  };

  public query func getAllPublications() : async [Publication.Struct] {
    publications.values().toArray();
  };

  public query func getPublicationByType(pubType : Publication.Type) : async [Publication.Struct] {
    publications.values().toArray().filter(func(pub) { pub.type_ == pubType });
  };

  public shared ({ caller }) func updatePublication(id : Nat, publication : Publication.Struct) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update publications");
    };
    switch (publications.get(id)) {
      case (null) { Runtime.trap("Publication not found") };
      case (?_) {
        let updatedPublication = {
          publication with id;
        };
        publications.add(id, updatedPublication);
      };
    };
  };

  public shared ({ caller }) func deletePublication(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete publications");
    };
    switch (publications.get(id)) {
      case (null) { Runtime.trap("Publication not found") };
      case (?_) {
        publications.remove(id);
      };
    };
  };

  // Certifications CRUD
  public shared ({ caller }) func createCertification(certification : Certification.Struct) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create certifications");
    };
    let certificationId = nextCertificationId;
    let newCertification = {
      certification with id = certificationId;
    };
    certifications.add(certificationId, newCertification);
    nextCertificationId += 1;
    certificationId;
  };

  public query ({ caller }) func getCertification(id : Nat) : async ?Certification.Struct {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view certifications");
    };
    certifications.get(id);
  };

  public query ({ caller }) func getAllCertifications() : async [Certification.Struct] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view certifications");
    };
    certifications.values().toArray();
  };

  public query ({ caller }) func getCertificationsByRecipient(recipientName : Text) : async [Certification.Struct] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can fetch certifications");
    };
    certifications.values().toArray().filter(func(cert) { Text.equal(cert.recipientName, recipientName) });
  };

  public shared ({ caller }) func updateCertification(id : Nat, certification : Certification.Struct) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update certifications");
    };
    switch (certifications.get(id)) {
      case (null) { Runtime.trap("Certification not found") };
      case (?_) {
        let updatedCertification = {
          certification with id;
        };
        certifications.add(id, updatedCertification);
      };
    };
  };

  public shared ({ caller }) func deleteCertification(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete certifications");
    };
    switch (certifications.get(id)) {
      case (null) { Runtime.trap("Certification not found") };
      case (?_) {
        certifications.remove(id);
      };
    };
  };

  // Accreditations CRUD
  public shared ({ caller }) func createAccreditation(accreditation : Accreditation.Struct) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create accreditations");
    };
    let accreditationId = nextAccreditationId;
    let newAccreditation = {
      accreditation with id = accreditationId;
    };
    accreditations.add(accreditationId, newAccreditation);
    nextAccreditationId += 1;
    accreditationId;
  };

  public query func getAccreditation(id : Nat) : async ?Accreditation.Struct {
    accreditations.get(id);
  };

  public query func getAllAccreditations() : async [Accreditation.Struct] {
    accreditations.values().toArray();
  };

  public shared ({ caller }) func updateAccreditation(id : Nat, accreditation : Accreditation.Struct) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update accreditations");
    };
    switch (accreditations.get(id)) {
      case (null) { Runtime.trap("Accreditation not found") };
      case (?_) {
        let updatedAccreditation = {
          accreditation with id;
        };
        accreditations.add(id, updatedAccreditation);
      };
    };
  };

  public shared ({ caller }) func deleteAccreditation(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete accreditations");
    };
    switch (accreditations.get(id)) {
      case (null) { Runtime.trap("Accreditation not found") };
      case (?_) {
        accreditations.remove(id);
      };
    };
  };

  // Recognition/Accolades CRUD
  public shared ({ caller }) func createRecognition(recognition : Recognition.Struct) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create recognitions");
    };
    let recognitionId = nextRecognitionId;
    let newRecognition = {
      recognition with id = recognitionId;
    };
    recognitions.add(recognitionId, newRecognition);
    nextRecognitionId += 1;
    recognitionId;
  };

  public query func getRecognition(id : Nat) : async ?Recognition.Struct {
    recognitions.get(id);
  };

  public query func getAllRecognitions() : async [Recognition.Struct] {
    recognitions.values().toArray();
  };

  public shared ({ caller }) func updateRecognition(id : Nat, recognition : Recognition.Struct) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update recognitions");
    };
    switch (recognitions.get(id)) {
      case (null) { Runtime.trap("Recognition not found") };
      case (?_) {
        let updatedRecognition = {
          recognition with id;
        };
        recognitions.add(id, updatedRecognition);
      };
    };
  };

  public shared ({ caller }) func deleteRecognition(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete recognitions");
    };
    switch (recognitions.get(id)) {
      case (null) { Runtime.trap("Recognition not found") };
      case (?_) {
        recognitions.remove(id);
      };
    };
  };

  // Inquiry/Contact Form - Accessible to guests
  public shared func submitInquiry(inquiry : Inquiry.Struct) : async Nat {
    let inquiryId = nextInquiryId;
    let newInquiry = {
      inquiry with
      id = inquiryId;
      submittedAt = Time.now();
    };
    inquiries.add(inquiryId, newInquiry);
    nextInquiryId += 1;
    inquiryId;
  };

  public query ({ caller }) func getInquiry(id : Nat) : async ?Inquiry.Struct {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    inquiries.get(id);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry.Struct] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    inquiries.values().toArray();
  };

  public shared ({ caller }) func deleteInquiry(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete inquiries");
    };
    switch (inquiries.get(id)) {
      case (null) { Runtime.trap("Inquiry not found") };
      case (?_) {
        inquiries.remove(id);
      };
    };
  };

  // AI Course Advisor - User only
  public shared ({ caller }) func createAIAdvisorSession(sessionId : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create AI advisor sessions");
    };
    let newSession : AIAdvisor.Session = {
      id = nextSessionId;
      sessionId;
      messages = [];
      recommendations = [];
    };
    aiAdvisorSessions.add(nextSessionId, newSession);
    let sid = nextSessionId;
    nextSessionId += 1;
    sid;
  };

  public query ({ caller }) func getAIAdvisorSession(sessionId : Nat) : async ?AIAdvisor.Session {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view AI advisor sessions");
    };
    aiAdvisorSessions.get(sessionId);
  };

  public shared ({ caller }) func addAIAdvisorMessage(sessionId : Nat, message : AIAdvisor.Message) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add messages");
    };
    switch (aiAdvisorSessions.get(sessionId)) {
      case (null) { Runtime.trap("Session not found") };
      case (?session) {
        let newMessages = List.empty<AIAdvisor.Message>();
        for (msg in session.messages.values()) {
          newMessages.add(msg);
        };
        newMessages.add(message);
        let updatedSession = {
          session with messages = newMessages.toArray();
        };
        aiAdvisorSessions.add(sessionId, updatedSession);
      };
    };
  };

  public shared ({ caller }) func updateAIAdvisorRecommendations(sessionId : Nat, recommendations : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update recommendations");
    };
    switch (aiAdvisorSessions.get(sessionId)) {
      case (null) { Runtime.trap("Session not found") };
      case (?session) {
        let updatedSession = {
          session with recommendations;
        };
        aiAdvisorSessions.add(sessionId, updatedSession);
      };
    };
  };
};
