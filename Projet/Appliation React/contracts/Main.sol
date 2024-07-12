// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Main {
    address public Admin = 0x40CbB3EF77a39004E30CEF330EE417a851fC29C9;
    mapping(address => _Admin) internal Admins;
    mapping(address => _Proprietaire) internal Proprietaires;
    mapping(address => _Locataire) internal Locataires;
    mapping(uint32 => _Place) internal Places;

    struct _Admin {
        address Admin_id;
        string name;
    }

    struct _Proprietaire {
        address Proprietaire_id;
        string name;
        uint32 phonenumber;
        string gouvernorat;
        string statut;
    }
    

    struct _Locataire {
        address Locataire_id;
        string name;
        uint32 phonenumber;
        string gouvernorat;
        string statut;
        string matricule;
        string duree_location;
        string IsReserved;
    }

    struct _Place {
        uint32 n;
        string longitude;
        string latitude;
        string duree_dispo;
        string duree_location;
        string date_debut;
        string matricule;
        string reservation;
        string locataire_name;
        string etat;
        string statut_rasp;
    }

    uint32[] Number;
    address[] Locatairelist;
    address[] Proprietairelist;

    uint32 number = 1;

    constructor() {
        Admins[Admin].name = "Mariem Turki";
        signupProprietaire(
            0x053e4dfD5f63Da6a0673E1c0616Cb285C881d068,
            "Ibrahim",
            12121212,
            "Medenine"
        );
        signupLocataire(
            0x1Bc0dCEf7831d75B6b384104049e1038054c5AA7,
            "Dali",
            11111111,
            "Tunis"
        );
    }

    function signupProprietaire(
        address _id,
        string memory _name,
        uint32 _phonenumber,
        string memory _gouvernorat
    ) public {
        Proprietaires[_id].Proprietaire_id = _id;
        Proprietaires[_id].name = _name;
        Proprietaires[_id].phonenumber = _phonenumber;
        Proprietaires[_id].gouvernorat = _gouvernorat;
        Proprietaires[_id].statut = "Active";
        Proprietairelist.push(_id);
    }

    function signupLocataire(
        address _id,
        string memory _name,
        uint32 _phonenumber,
        string memory _gouvernorat
    ) public {
        Locataires[_id].Locataire_id = _id;
        Locataires[_id].name = _name;
        Locataires[_id].phonenumber = _phonenumber;
        Locataires[_id].gouvernorat = _gouvernorat;
        Locataires[_id].statut = "Active";
        Locataires[_id].IsReserved = "False";
        Locatairelist.push(_id);
    }

    function ProprietaireManage(address _id, string calldata _statut) external {
        Proprietaires[_id].statut = _statut;
    }

    function LocataireManage(address _id, string calldata _statut) external {
        Locataires[_id].statut = _statut;
    }

    function isAdminExist() external view returns (string memory) {
        if (msg.sender == Admin) {
            return "true";
        } else {
            return "false";
        }
    }

    function isProprietaireExist() external view returns (string memory) {
        _Proprietaire storage p = Proprietaires[msg.sender];
        if (
            (p.Proprietaire_id > address(0x0)) &&
            (keccak256(abi.encodePacked(p.statut)) ==
                keccak256(abi.encodePacked("Active")))
        ) {
            return "true";
        } else {
            return "false";
        }
    }

    function isLocataireExist() external view returns (string memory) {
        _Locataire storage l = Locataires[msg.sender];
        if (
            (l.Locataire_id > address(0x0)) &&
            (keccak256(abi.encodePacked(l.statut)) ==
                keccak256(abi.encodePacked("Active")))
        ) {
            return "true";
        } else {
            return "false";
        }
    }

    function AdministrateurName() external view returns (string memory) {
        return Admins[msg.sender].name;
    }

    function ProprietaireName() external view returns (string memory) {
        return Proprietaires[msg.sender].name;
    }

    function LocataireName() external view returns (string memory) {
        return Locataires[msg.sender].name;
    }

    function setOffre(
        string memory _longitude,
        string memory _latitude,
        string memory _duree_dispo,
        string memory _date_debut
    ) external {
        Places[number].n = number;
        Places[number].longitude = _longitude;
        Places[number].latitude = _latitude;
        Places[number].duree_dispo = _duree_dispo;
        Places[number].date_debut = _date_debut;
        Places[number].reservation = "Place non reservee";
        Number.push(number);
        number += 1;
    }

    function getOffre()
        external
        view
        returns (
            uint32[] memory,
            string[] memory,
            string[] memory,
            string[] memory,
            string[] memory,
            string[] memory,
            string[] memory
        )
    {
        uint32[] memory n = new uint32[](Number.length);
        string[] memory longitude = new string[](Number.length);
        string[] memory latitude = new string[](Number.length);
        string[] memory duree_dispo = new string[](Number.length);
        string[] memory date_debut = new string[](Number.length);
        string[] memory reservation = new string[](Number.length);
        string[] memory locatairename = new string[](Number.length);

        for (uint32 i = 0; i < Number.length; i++) {
            n[i] = Number[i];
            longitude[i] = Places[Number[i]].longitude;
            latitude[i] = Places[Number[i]].latitude;
            duree_dispo[i] = Places[Number[i]].duree_dispo;
            date_debut[i] = Places[Number[i]].date_debut;
            reservation[i] = Places[Number[i]].reservation;
            locatairename[i] = Places[Number[i]].locataire_name;
        }
        return (
            n,
            longitude,
            latitude,
            duree_dispo,
            date_debut,
            reservation,
            locatairename
        );
    }

    function setEtat(uint32 _number, string memory _etat) external {
        Places[_number].etat = _etat;
    }

    function setReservation(uint32 _number) external {
        Places[_number].reservation = "Place reservee";
        Places[_number].locataire_name = Locataires[msg.sender].name;
        Places[_number].matricule = Locataires[msg.sender].matricule;
        Places[_number].duree_location = Locataires[msg.sender].duree_location;
        Locataires[msg.sender].IsReserved = "True";
    }
    function getIsReserved() external view returns (string memory) {
        return Locataires[msg.sender].IsReserved;
    }

    function setMatricule(
        string memory _matricule,
        string memory _duree_location
    ) public {
        Locataires[msg.sender].matricule = _matricule;
        Locataires[msg.sender].duree_location = _duree_location;
    }

    function getReservedOffre()
        external
        view
        returns (
            string[] memory,
            string[] memory,
            string[] memory
        )
    {
        string[] memory duree_location = new string[](Number.length);
        string[] memory statut_rasp = new string[](Number.length);
        string[] memory matricule = new string[](Number.length);

        for (uint32 i = 0; i < Number.length; i++) {
            {
                duree_location[i] = Places[Number[i]].duree_location;
                statut_rasp[i] = Places[Number[i]].statut_rasp;
                matricule[i] = Places[Number[i]].matricule;
            }
        }
        return (duree_location, statut_rasp, matricule);
    }

    function Locataireliste()
        external
        view
        returns (
            address[] memory,
            string[] memory,
            uint32[] memory,
            string[] memory,
            string[] memory
        )
    {
        address[] memory id = new address[](Locatairelist.length);
        string[] memory name = new string[](Locatairelist.length);
        uint32[] memory phonenumber = new uint32[](Locatairelist.length);
        string[] memory gouvernorat = new string[](Locatairelist.length);
        string[] memory statut = new string[](Locatairelist.length);
        for (uint256 i = 0; i < Locatairelist.length; i++) {
            if (msg.sender == Admin) {
                id[i] = Locatairelist[i];
                name[i] = Locataires[Locatairelist[i]].name;
                phonenumber[i] = Locataires[Locatairelist[i]].phonenumber;
                gouvernorat[i] = Locataires[Locatairelist[i]].gouvernorat;
                statut[i] = Locataires[Locatairelist[i]].statut;
            } else {
                if (
                    keccak256(
                        abi.encodePacked(Locataires[Locatairelist[i]].statut)
                    ) == keccak256(abi.encodePacked("Debloquee"))
                ) {
                    id[i] = Locatairelist[i];
                    name[i] = Locataires[Locatairelist[i]].name;
                    phonenumber[i] = Locataires[Locatairelist[i]].phonenumber;
                    gouvernorat[i] = Locataires[Locatairelist[i]].gouvernorat;
                } else {
                    continue;
                }
            }
        }
        return (id, name, phonenumber, gouvernorat, statut);
    }

    function Proprietaireliste()
        external
        view
        returns (
            address[] memory,
            string[] memory,
            uint32[] memory,
            string[] memory,
            string[] memory
        )
    {
        address[] memory id = new address[](Proprietairelist.length);
        string[] memory name = new string[](Proprietairelist.length);
        uint32[] memory phonenumber = new uint32[](Proprietairelist.length);
        string[] memory gouvernorat = new string[](Proprietairelist.length);
        string[] memory statut = new string[](Proprietairelist.length);
        for (uint256 i = 0; i < Proprietairelist.length; i++) {
            if (msg.sender == Admin) {
                id[i] = Proprietairelist[i];
                name[i] = Proprietaires[Proprietairelist[i]].name;
                phonenumber[i] = Proprietaires[Proprietairelist[i]].phonenumber;
                gouvernorat[i] = Proprietaires[Proprietairelist[i]].gouvernorat;
                statut[i] = Proprietaires[Proprietairelist[i]].statut;
            } else {
                if (
                    keccak256(
                        abi.encodePacked(
                            Proprietaires[Proprietairelist[i]].statut
                        )
                    ) == keccak256(abi.encodePacked("Debloquee"))
                ) {
                    id[i] = Proprietairelist[i];
                    name[i] = Proprietaires[Proprietairelist[i]].name;
                    phonenumber[i] = Proprietaires[Proprietairelist[i]]
                        .phonenumber;
                    gouvernorat[i] = Proprietaires[Proprietairelist[i]]
                        .gouvernorat;
                } else {
                    continue;
                }
            }
        }
        return (id, name, phonenumber, gouvernorat, statut);
    }
}
