import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from "react-router-dom";
import { Container, Input, Button, VStack, HStack, Text, Box, Spinner, List, ListItem } from "@chakra-ui/react";
import { FaSearch, FaShip, FaCertificate } from "react-icons/fa";

const VesselSearch = () => {
  const [query, setQuery] = useState("");
  const [vessels, setVessels] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/vessels?search=${query}`);
      const data = await response.json();
      setVessels(data);
    } catch (error) {
      console.error("Error fetching vessels:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input placeholder="Search for a vessel" value={query} onChange={(e) => setQuery(e.target.value)} />
          <Button leftIcon={<FaSearch />} onClick={handleSearch} colorScheme="teal">
            Search
          </Button>
        </HStack>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <List spacing={3} width="100%">
            {vessels.map((vessel) => (
              <ListItem key={vessel.id} onClick={() => navigate(`/vessels/${vessel.id}`)} cursor="pointer" _hover={{ bg: "gray.100" }} p={2} borderRadius="md">
                <HStack>
                  <FaShip />
                  <Text>{vessel.name}</Text>
                </HStack>
              </ListItem>
            ))}
          </List>
        )}
      </VStack>
    </Container>
  );
};

const VesselCertificates = () => {
  const { vesselId } = useParams();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/vessels/${vesselId}/certificates`);
        const data = await response.json();
        setCertificates(data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [vesselId]);

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Button as={Link} to="/" leftIcon={<FaShip />} colorScheme="teal" variant="outline">
          Back to Search
        </Button>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <List spacing={3} width="100%">
            {certificates.map((certificate) => (
              <ListItem key={certificate.id} p={2} borderRadius="md" borderWidth="1px">
                <HStack>
                  <FaCertificate />
                  <Box>
                    <Text fontWeight="bold">{certificate.name}</Text>
                    <Text>{certificate.issueDate}</Text>
                  </Box>
                </HStack>
              </ListItem>
            ))}
          </List>
        )}
      </VStack>
    </Container>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<VesselSearch />} />
      <Route path="/vessels/:vesselId" element={<VesselCertificates />} />
    </Routes>
  </Router>
);

export default App;
